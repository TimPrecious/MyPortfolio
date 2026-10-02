// This file is the content desk: edit these objects once and the page updates everywhere.
const portfolioData = {
    name: 'Precious Tim', role: 'Front End Web Developer',
    tagline: 'Designing clear, thoughtful interfaces with just enough personality to stand out.',
    bio: [
        'I’m Precious, a front-end web developer who enjoys turning ideas into clear, responsive interfaces. I work with HTML, CSS, and JavaScript, paying attention to structure, visual hierarchy, and the small interactions that make a page feel considered.',
        'My projects range from recreating familiar sites to shaping clean marketing pages. I like breaking a design into tidy pieces, checking how it behaves across screen sizes, and refining the details until the experience feels easy to use. I’m always curious about why something works and how to make it work better.'
    ],
    projects: [
        {
            title: 'Goal.com Site Clone',
            description: 'A polished front-end clone focused on responsive layout, clean product storytelling, and a premium landing-page feel.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80',
            live: '#',
            code: '#'
        },
        {
            title: 'Neat Site',
            description: 'A clean, modern marketing page built around a stripped-back visual style, clear hierarchy, and smooth UX details.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
            live: '#',
            code: '#'
        },
        {
            title: 'Coming Soon',
            description: 'A new project is on the way and will be showcased here soon.',
            tags: ['Coming Soon', 'Build', 'Design'],
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
            live: '#',
            code: '#'
        }
    ],
    skillGroups: [{ title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] }, { title: 'Tools', items: ['Git', 'VS Code'] }],
    blogPosts: [
        { date: 'notes from the desk', title: 'What I learned building my first real interface', excerpt: 'A short, honest note about the gap between following a tutorial and making something someone can actually use.', tags: ['learning', 'frontend'] },
        { date: 'field note', title: 'A tiny CSS trick with a suspiciously big payoff', excerpt: 'Small details make interfaces feel considered. Here is one I keep coming back to.', tags: ['css', 'design'] },
        { date: 'debug diary', title: 'The bug was not where I thought it was', excerpt: 'A practical reminder that debugging is often about asking a better question, not typing faster.', tags: ['javascript', 'debugging'] }
    ],
    socialLinks: { email: 'hello@example.com', github: '#', linkedin: '#' }
};