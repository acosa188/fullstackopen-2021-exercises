const dummy = (blogs) => {
    return 1;
}

const totalLikes = blogs => {
    return blogs.map(blog => blog.likes).reduce((a, b) => a + b, 0);
}

const favoriteBlog = blogs => {
    const mostLikedBlog =  blogs.filter((blog) => blog.likes === Math.max(...blogs.map(el => el.likes)));
    if(mostLikedBlog.length === 0) return null;
    return mostLikedBlog[0];
}

const mostBlogs = blogs => {
    const authors  = new Set(blogs.map(blog => blog.author));
    let authorsAndBlogs = [];
    

    authors.forEach((author) => {
        const authorAndBlog = {
            author,
            blogs: blogs.filter(el => el.author === author).length
        };

        authorsAndBlogs.push(authorAndBlog);
    });  

    const mostAuthorBlogged = authorsAndBlogs.filter(elem => elem.blogs === Math.max(...authorsAndBlogs.map(x => x.blogs)));

    if(mostAuthorBlogged.length > 0) return authorsAndBlogs.filter(elem => elem.blogs === Math.max(...authorsAndBlogs.map(x => x.blogs)))[0]

    return {};
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}