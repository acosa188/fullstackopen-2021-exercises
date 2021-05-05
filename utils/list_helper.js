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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}