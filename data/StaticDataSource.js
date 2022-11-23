import GroupModel from "../models/GroupModel"
export const DefaultGroup = [
    new GroupModel("grp1", "My Day", "#448aff", "sun"),
    new GroupModel("grp2", "Important", "#ff6e40", "star"),
    new GroupModel("grp3", "Planned", "#00695c", "calendar"),
    new GroupModel("grp4", "All", "#ffab00", "archive"),
    new GroupModel("grp5", "Complete", "#e15b2e", "check-circle"),
]

import TodoModel from "../models/TodoModel"
export const TodoTemp = [
    new TodoModel("1", "grp1", "Some Todo", "SOme dasdhajsd", "19081209380123", false, false),
    new TodoModel("12", "grp1", "Some Todo", "SOme dasdhajsd", "19081209380123", false, false),
    new TodoModel("13", "grp1", "Some Todo", "SOme dasdhajsd", "19081209380123", false, false),
    new TodoModel("14", "grp1", "Some Todo", "SOme dasdhajsd", "19081209380123", false, false),
]

import TaskOptionModel from "../models/TaskOptionModel"
export const TaskOptions = [
    new TaskOptionModel("1", "", "map", false, {}, ""),
    new TaskOptionModel("2", "", "event", false, {}, ""),
    new TaskOptionModel("3", "", "add-alarm", false, {}, ""),
    new TaskOptionModel("4", "", "note", false, {}, ""),
]
