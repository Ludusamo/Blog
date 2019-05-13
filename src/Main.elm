module Main exposing (view)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Navbar as Navbar
import Browser exposing (sandbox)
import Debug
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (href)
import Html.Events exposing (onClick)
import Http
import Json.Decode as Decode
import PostListing


type alias Model =
    { navbarState : Navbar.State
    , postListing : PostListing.Model
    }


init : flags -> ( Model, Cmd Msg )
init flags =
    let
        ( navbarState, navbarCmd ) =
            Navbar.initialState NavbarMsg
    in
    ( { navbarState = navbarState
      , postListing = PostListing.Model []
      }
    , getPostMetadata
    )


type Msg
    = NavbarMsg Navbar.State
    | ReceivePostMetadata (Result Http.Error (List PostListing.PostInfo))


getPostMetadata : Cmd Msg
getPostMetadata =
    Http.get
        { url = "/static/metadata.json"
        , expect =
            Http.expectJson
                ReceivePostMetadata
                (Decode.list PostListing.postInfoDecoder)
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NavbarMsg state ->
            ( { model | navbarState = state }, Cmd.none )

        ReceivePostMetadata res ->
            case res of
                Ok postInfo ->
                    ( { model
                        | postListing =
                            PostListing.Model
                                (List.reverse (List.sortBy .date postInfo))
                      }
                    , Cmd.none
                    )

                Err _ ->
                    ( model, Cmd.none )


view : Model -> Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet
        , Navbar.config NavbarMsg
            |> Navbar.withAnimation
            |> Navbar.brand [ href "#" ] [ text "Ludusamo's Blog" ]
            |> Navbar.items
                [ Navbar.itemLink [ href "#" ] [ text "Latest" ]
                , Navbar.itemLink [ href "#" ] [ text "Tags" ]
                ]
            |> Navbar.view model.navbarState
        , PostListing.view model.postListing
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Navbar.subscriptions model.navbarState NavbarMsg


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
