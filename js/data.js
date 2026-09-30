// This file is the content desk: edit these objects once and the page updates everywhere.
const portfolioData = {
    name: 'Precious Tim', role: '[TARGET ROLE]',
    tagline: 'Junior developer with a curious brain, a fondness for tidy systems, and just enough CSS to be dangerous.',
    bio: '[ABOUT BIO PLACEHOLDER] I am a junior developer who enjoys turning slightly messy ideas into clear, useful digital experiences.',
    projects: [
        { title: '[PROJECT 1]', description: 'A placeholder product for solving a real problem without making the user read a manual.', tags: ['HTML', 'CSS', 'JavaScript'], live: '#', code: '#' },
        { title: '[PROJECT 2]', description: 'A small backend experiment where good data and a friendly interface get along.', tags: ['Python', 'Django', 'SQLite'], live: '#', code: '#' },
        { title: '[PROJECT 3]', description: 'A useful little tool, lovingly overthought and shipped anyway.', tags: ['JavaScript', 'API', 'Git'], live: '#', code: '#' }
    ],
    skillGroups: [{ title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] }, { title: 'Backend', items: ['Python', 'Django', 'REST APIs'] }, { title: 'Tools', items: ['Git', 'VS Code', 'Figma'] }],
    blogPosts: [
        { date: 'notes from the desk', title: 'What I learned building my first real interface', excerpt: 'A short, honest note about the gap between following a tutorial and making something someone can actually use.', tags: ['learning', 'frontend'] },
        { date: 'field note', title: 'A tiny CSS trick with a suspiciously big payoff', excerpt: 'Small details make interfaces feel considered. Here is one I keep coming back to.', tags: ['css', 'design'] },
        { date: 'debug diary', title: 'The bug was not where I thought it was', excerpt: 'A practical reminder that debugging is often about asking a better question, not typing faster.', tags: ['javascript', 'debugging'] }
    ],
    socialLinks: { email: 'hello@example.com', github: '#', linkedin: '#' }
};