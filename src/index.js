/*global jsyaml, moment*/
/*eslint no-undef: "error"*/

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
  const postLink = document.createElement('a')
  postLink.setAttribute('href', post.route)
  postLink.innerText = post.title
  postTitle.appendChild(postLink)
  postDate.innerText = moment(post.date).format('YYYY-MM-DD')
  postEle.appendChild(postTitle)
  postEle.appendChild(postDate)
  return postEle
}

function populatePostList(postMetadata) {
  const postGrouping = yearGrouping(postMetadata)
  let postList = document.getElementsByTagName('PostList')[0]
  for (const year in postGrouping) {
    const yearGroupEle = document.createElement('YearGroup')
    const yearTitle = document.createElement('YearTitle')
    yearTitle.innerText = year
    yearGroupEle.appendChild(yearTitle)
    for (const post of postGrouping[year]) {
      yearGroupEle.appendChild(createPostListing(post))
    }
    console.log(postList)
    postList.appendChild(yearGroupEle)
  }
}

async function main() {
  const res = await fetch('posts/metadata.yml', {headers: {
        'Content-Type': 'application/yaml'
      }})
  const yamlContent = await res.text()
  const metadata = jsyaml.safeLoad(yamlContent).posts
  populatePostList(metadata)
}

main()
