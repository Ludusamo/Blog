module PostListing exposing (Model, PostInfo, postInfoDecoder, view)

import Bootstrap.Card as Card
import Bootstrap.Card.Block as Block
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Dict
import Html exposing (Html, h2, text)
import Html.Attributes exposing (style)
import Json.Decode exposing (Decoder, field, map3, string)


type alias PostInfo =
    { name : String
    , description : String
    , date : String
    }


postInfoDecoder : Decoder PostInfo
postInfoDecoder =
    map3 PostInfo
        (field "name" string)
        (field "description" string)
        (field "date" string)


type alias Model =
    { postInfo : List PostInfo }


postToCard : PostInfo -> Card.Config msg
postToCard info =
    Card.config []
        |> Card.headerH3 [] [ text info.name ]
        |> Card.block []
            [ Block.text []
                [ text info.description ]
            ]
        |> Card.footer [] [ text ("Date: " ++ info.date) ]


view : Model -> Html msg
view model =
    Grid.container []
        (List.map
            (\info ->
                Grid.row [ Row.attrs [ style "padding" "1rem" ] ]
                    [ Grid.col []
                        [ Card.view (postToCard info) ]
                    ]
            )
            model.postInfo
        )
