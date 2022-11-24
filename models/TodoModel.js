class Todo {
    constructor(id, grpId, title, desc, date, isComplete, isFavorite, location ) {
        this.id = id;
        this.grpId = grpId;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.isComplete = isComplete;
        this.isFavorite = isFavorite;
        this.location = location;
    }
}

export default Todo; 