class Todo {
    constructor(id, grpId, title, disc, date, isComplete, isFavorite) {
        this.id = id;
        this.grpId = grpId;
        this.title = title;
        this.disc = disc;
        this.date = date;
        this.complete = isComplete;
        this.favorite = isFavorite;
    }
}

export default Todo; 