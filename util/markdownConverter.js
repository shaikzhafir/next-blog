import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import post from '../pages/posts'
import prism from 'remark-prism';


//rip onlyfans
function onlyMDs(file){
    var x=/^[^.]+.md$/;
    return x.test(file) 
}

export function getSortedMarkdownData(postType){
    const markdownDirectory = path.join(process.cwd(),postType)
    const fileNames = fs.readdirSync(markdownDirectory)
    const allMarkdownData = fileNames.filter(onlyMDs).map(fileName => {
        //regex to remove md extension
        if (fileName == 'images'){
            return
        }
        const id = fileName.replace(/\.md$/,'')
        const fullPath = path.join(markdownDirectory,fileName)
        const fileContents = fs.readFileSync(fullPath,'utf8')

        //gray matter
        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        }
    })

    //need to use reverse for sort, doesnt seem to work when swapping a and b 
    return allMarkdownData.filter(markdown => markdown.id && markdown.title && markdown.slug)
                          .sort((a,b) => {
                            return new Date(b.date) - new Date(a.date)})
    
                       
                          
                          

}

export function getAllMarkdownIds(postType){
    const markdownDirectory = path.join(process.cwd(),postType)
    const fileNames = fs.readdirSync(markdownDirectory)

    return fileNames.map(fileName => {
        return {
            params : {id : fileName.replace(/\.md$/,"")}
        }
    })
}


export async function getMarkdownData(id,postType){
    const markdownDirectory = path.join(process.cwd(),postType)
    const fullPath = path.join(markdownDirectory,`${id}.md`)
    const fileContents = fs.readFileSync(fullPath,'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(html)
        .use(prism)
        .process(matterResult.content)
    const contentHTML = processedContent.toString()
    
    return {
        id,
        contentHTML,
        ...matterResult.data
    }
}