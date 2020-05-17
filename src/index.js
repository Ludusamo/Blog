/*global jsyaml, moment, showdown, Prism*/
/*eslint no-undef: "error"*/

showdown.setFlavor('github');
showdown.setOption('simpleLineBreaks', false);

// Routes

let mainPage = `
    <Header>
      <HeaderTitle>
        <BrandLeft>LUDUS</BrandLeft><BrandRight>AMO</BrandRight>
      </HeaderTitle>
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
  <Header>
    <BackButton>◀</BackButton>
  </Header>
  <hr/>
  <PostTitle>
  </PostTitle>
  <PostDate>
  </PostDate>
  <PostTags>
  </PostTags>
  <PostReadingTime>
  </PostReadingTime>
  <PostContent>
  </PostContent>
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
  await routes[parsedURL].load(request.id)
}

const onNavLinkClick = (pathName, state={}) => {
  window.history.pushState(state, pathName, window.location.origin + pathName)
  router()
}

window.onpopstate = router
window.addEventListener('hashchange', router)
window.addEventListener('load', router)

// Scripting

async function getPostMetadata() {
  const res = await fetch('/blog/posts/metadata.yml',
    { headers: {
        'Content-Type': 'application/yaml'
      }})
  const yamlContent = await res.text()
  return jsyaml.safeLoad(yamlContent).posts
}

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
  const postTitle = document.createElement('PostListTitle')
  const postDate = document.createElement('PostListDate')
  const postLink = document.createElement('PostLink')
  postLink.innerText = post.title
  postLink.onclick = () => onNavLinkClick('/blog/#/post/' + post.route)
  postLink.classList.add('link')
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
  populatePostList(await getPostMetadata())
}

async function loadPostContent(id) {
  const markdownLoc = '/blog/posts/' + id + '/' + id + '.md'
  const res = await fetch(markdownLoc,
    { headers: { 'Content-Type': 'text/markdown; charset=UTF-8' }})
  const md = await res.text()
  const content = new showdown.Converter().makeHtml(md)
  return content
}

async function postPageLoad(id) {
  const metadata = await getPostMetadata()
  let backButton = document.getElementsByTagName('BackButton')[0]
  backButton.onclick = () => {
      onNavLinkClick('/blog', {})
  }
  const postInfo = metadata[id]
  const content = await loadPostContent(id)
  document.getElementsByTagName('PostTitle')[0].innerText = postInfo.title
  document.getElementsByTagName('PostDate')[0].innerText =
    'Date: ' + moment(postInfo.date).format('ll')
  document.getElementsByTagName('PostTags')[0].innerText =
    'Tags: ' + postInfo.tags
  document.getElementsByTagName('PostContent')[0].innerHTML = content
  document.getElementsByTagName('PostReadingTIme')[0].innerText =
    'Time: ~' + Math.ceil(content.split(' ').length / 200) + ' min'
  await Prism.highlightAll()
}
