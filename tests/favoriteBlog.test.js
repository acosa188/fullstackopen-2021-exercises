const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe('favorite blog', () => {
    test('returns null if empty list', () => {
        expect(favoriteBlog([])).toBe(null);
    });

    test('returns itself if there is only one', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]

        expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
    });

    test('returns the largest like', () => {
        const listBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f9',
                title: 'Go To Statement Considered Healthy',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 1,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f10',
                title: 'Go To Statement Considered Meh',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 3,
                __v: 0
            }
        ];

        expect(favoriteBlog(listBlogs)).toEqual(listBlogs[0])
    });
});