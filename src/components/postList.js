import styled from 'styled-components'

const Post = styled.div`
    // border-top: 2px solid black;
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
`

const PostDetails = styled.div`
    display: flex;
    flex-direction: column;
`

const PostThumbnail = styled.div`
    width: 200;
    padding-right: 5%;
`

const PostTitle = styled.h3`
	color: black;
`

export { Post, PostTitle, PostDetails, PostThumbnail }
