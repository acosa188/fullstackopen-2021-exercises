const totalLikes = require("../utils/list_helper").totalLikes;

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(totalLikes([])).toBe(0);
    });

    test('when list has only one blog equals the likes of that', () => {
        expect(totalLikes([
            {
                title: "Story of my life",
                author: "mushy dumpling",
                url: "http://myblog.com/story-of-my-life",
                likes: 521
            }])).toBe(521);
    });

    test('of a bigger list is calculated right', () => {
        expect(totalLikes([
            {
                title: "Story of my life",
                author: "mushy dumpling",
                url: "http://myblog.com/story-of-my-life",
                likes: 521
            },
            {
                title: "Story of my life chapter 2",
                author: "mushy dumpling",
                url: "http://myblog.com/story-of-my-life-chapter-2",
                likes: 1001
            },
        ])).toBe(1522);
    });
});