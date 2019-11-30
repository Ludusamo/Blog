/*global jsyaml, moment*/
/*eslint no-undef: "error"*/

// Routes

let mainPage = `
    <Header>
      <HeaderTitle>
        Ludusamo's Blog
      </HeaderTitle>
      <Links>
        <a href="/tags">Tags</a>
      </Links>
      <Links>
        <a href="/archive">Archive</a>
      </Links>
      <Links>
        <a href="/rss">RSS</a>
      </Links>
    </Header>
    <hr/>
    <Description>
      Hi, my name is Brendan Horng! I am a software engineer passionate about compiler and language design. I am also a casual pen collector and video game player.
    </Description>
    <hr/>
    <PostList>
    </PostList>
    <hr/>
    <Footer>
      © 2019 Brendan Horng • License <a href="https://github.com/Ludusamo/blog/blob/master/LICENSE">MIT</a>
    </Footer>
`

let postPage = `
  Post Page
`

// Routing

let routes =
  { '/': { content: mainPage, load: mainPageLoad }
  , '/post/:id': { content: postPage, load: postPageLoad }
  }

let parseRequestURL = () => {
  let url = location.hash.slice(1).toLowerCase() || '/'
  let r = url.split('/')
  let request = {
    resource: null,
    id: null
  }
  request.resource = r[1]
  request.id       = r[2]
  return request
}

const router = async () => {
  const content = null || document.getElementsByTagName('Content')[0]
  let request = parseRequestURL()
  let parsedURL = (request.resource ? '/' + request.resource : '/')
                + (request.id ? '/:id' : '')
  content.innerHTML = routes[parsedURL].content
  await routes[parsedURL].load()
}

const onNavLinkClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin +  pathName)
  router()
}

window.onpopstate = router
window.addEventListener('hashchange', router)
window.addEventListener('load', router)

// Scripting

function yearGrouping(posts) {
  let years = {}
  for (const postName in posts) {
    let postInfo = posts[postName]
    postInfo['route'] = postName
    let year = postInfo.date.getFullYear()
    if (!(year in years)) {
      years[year] = []
    }
    years[year].push(postInfo)
  }
  return years;
}

function createPostListing(post) {
  const postEle = document.createElement('PostListing')
  const postTitle = document.createElement('PostTitle')
  const postDate = document.createElement('PostDate')
  const postLink = document.createElement('PostLink')
  postLink.innerText = post.title
  postLink.onclick = () => onNavLinkClick('/#/post/' + post.route)
  postTitle.appendChild(postLink)
  postDate.innerText = moment(post.date).format('YYYY-MM-DD')
  postEle.appendChild(postTitle)
  postEle.appendChild(postDate)
  return postEle
}

function populatePostList(postMetadata) {
  const postGrouping = yearGrouping(postMetadata)
  let postList = document.getElementsByTagName('PostList')[0]
  postList.innerHTML = ''
  for (const year in postGrouping) {
    const yearGroupEle = document.createElement('YearGroup')
    const yearTitle = document.createElement('YearTitle')
    yearTitle.innerText = year
    yearGroupEle.appendChild(yearTitle)
    for (const post of postGrouping[year]) {
      yearGroupEle.appendChild(createPostListing(post))
    }
    postList.appendChild(yearGroupEle)
  }
}

async function mainPageLoad() {
  const res = await fetch('posts/metadata.yml', {headers: {
        'Content-Type': 'application/yaml'
      }})
  const yamlContent = await res.text()
  const metadata = jsyaml.safeLoad(yamlContent).posts
  populatePostList(metadata)
}

async function postPageLoad() {

}
