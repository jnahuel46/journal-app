export const startNewNote = () => {
    return async( dispatch ) => {
        console.log(123);
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
    }
};