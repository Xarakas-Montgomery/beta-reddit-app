export const getSubredditPosts = async (subReddit = 'all'/*, sort = 'popular'*/) => {
    try {
        const response = await fetch(`/r/${subReddit}.json`);
        if (!response.ok) {
            throw new Error(`Fetching unavailable for r/${subReddit}`)
        }
        const json = await response.json();
        
        // extract the list of posts
        const posts = json.data.children.map((child) => {
        const post = child.data;

        // Try to get the best image available
        let imageUrl = post.preview?.images?.[0]?.source?.url || post.thumbnail;

        // Decode HTML entities like &amp;
        if (imageUrl && imageUrl.includes("&amp;")) {
            imageUrl = imageUrl.replace(/&amp;/g, "&");
        }

        // Filter out invalid or placeholder thumbnails
        const isValidImage =
        imageUrl &&
        imageUrl.startsWith("https") &&
        !["self", "default", "nsfw", "spoiler", "image", ""].includes(imageUrl);

            return {
                id: post.id,
                title: post.title,
                author: post.author,
                selftext: post.selftext || "",
                ups: post.ups,
                num_comments: post.num_comments,
                url: post.url,
                permalink: post.permalink,
                thumbnail: isValidImage ? imageUrl : null ,
                date: new Date(post.created_utc * 1000).toLocaleString()
            };
        });

        console.log(posts);
        return posts;

    } catch (error) {
        console.log('Error Fetch:', error);
        return [];
    }
};

/* THIS IS FOR GETTING 3 LEVEL DEEP OF COMMENTS' REPLIES BUT I DON'T FIND
    AN EASY WAY TO CONTROL THIS DIV WITH .CSS RULES AS IT WILL GET THE REPLIES
    OUT OF THE BORDERS, MESSY AND CHAOTIC.

    I FEEL LIKE TO SAVE ANYWAY THIS FETCHING TECNIQUE FOR FUTURE REFERENCES,
    FOR NOW I WILL KEEP IT COMMENTED AS IT IS.

    IF YOU WANT TO USE THIS LOGIC JUST UNCOMMENT AND COMMENT THE OTHER LAST 
    'getComments()' FUNCTION.

function parseComment(comment, level = 1, maxLevel = 3) {
    const replies = comment.replies && comment.replies.data && level < maxLevel
        ? comment.replies.data.children
            .filter(child => child.kind === "t1")
            .map(child => parseComment(child.data, level + 1, maxLevel))
        : [];

    return {
        id: comment.id,
        author: comment.author,
        body: comment.body,
        ups: comment.ups,
        date: new Date(comment.created_utc * 1000).toLocaleString(),
        replies: replies
    };
}

export const getComments = async (permalink) => {
    const response = await fetch(`${permalink}.json`);
    const json = await response.json();

    const comments = json[1].data.children
        .filter(child => child.kind === "t1")
        .map(child => parseComment(child.data, 1, 3));

    return comments;
};*/

export const getComments = async (permalink) => {
    const response = await fetch(`${permalink}.json`);
    const json = await response.json();

    //Reddit returns the comments from the 2nd JSON object
    const comments = json[1].data.children
    .filter(child => child.kind === "t1") // only real comments and not empty boxes with 'invalid date' below.
    .map((child) => {
        const comment = child.data;

        const hasReplies = comment.replies && comment.replies.data ? 
        comment.replies.data.children
        .filter(c => c.kind === "t1") //only real replies and not empty boxes with 'invalid date' below.
        .map(reply => {
            const r = reply.data;
            return {
                id: r.id,
                author: r.author,
                body: r.body,
                ups: r.ups,
                date: new Date(r.created_utc * 1000).toLocaleString(),
                replies: [] // for now, only one level deep
            }
            }) : [] ;


            return {
                id: comment.id,
                author: comment.author,
                body: comment.body,
                ups: comment.ups,
                date: new Date(comment.created_utc * 1000).toLocaleString(),
                replies: hasReplies
            }
    })

    console.log(comments);
    return comments;
}