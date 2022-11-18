import * as SQLite from 'expo-sqlite'
import GroupModel from '../models/GroupModel';
import Todo from '../models/TodoModel';

const database = SQLite.openDatabase("mydatabase.db")

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(
            async (txn) => {
                var errorMesg = ""
                await txn.executeSql(
                    `CREATE TABLE IF NOT EXISTS groups (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                icon TEXT NOT NULL,
                color TEXT NOT NULL
            )`,
                    [],
                    (_, error) => {
                        errorMesg = error
                    },
                    (_, error) => {
                        errorMesg = error
                        reject(error);
                    }
                )
                await txn.executeSql(
                    `CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY NOT NULL,
                grpId TEXT NOT NULL,
                title TEXT NOT NULL,
                desc TEXT NULL,
                isComplete INTEGER NOT NULL,
                isFavorite INTEGER NOT NULL,
                date INTEGER NOT NULL
            )`,
                    [],
                    (_, error) => {
                        errorMesg = error
                    },
                    (_, error) => {
                        errorMesg = error
                        reject(error);
                    }
                )

                resolve();
            }

        );
    })
    return promise;
}

export function insertGroup(group) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((txn) => {
            txn.executeSql(`INSERT INTO groups 
                    (
                    title, 
                    icon,
                    color
                    ) 
                    VALUES (?,?,?)
                    `,
                [group.title, group.icon, group.color],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    console.log(error);
                    reject(error)
                },
            )
        });
    });
    return promise;
}

export function fetchGroup() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((txn) => {
            txn.executeSql(`SELECT * FROM groups`,
                [],
                (_, result) => {
                    const groups = []
                    for (const dp of result.rows._array) {
                        groups.push(new GroupModel(dp.id, dp.title, dp.color, dp.icon))
                    }
                    resolve(groups);
                },
                (_, error) => {
                    reject(error);
                },
            )
        });
    });
    return promise;
}

export function insertTodo(todo) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((txn) => {
            txn.executeSql(`INSERT INTO todos 
                    (
                    title, 
                    grpId,
                    desc,
                    isComplete,
                    isFavorite,
                    date
                    ) 
                    VALUES (?,?,?,?,?,?)
                    `,
                [todo.title, todo.grpId, todo.desc, 0, 0, todo.date],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                },
            )
        });
    });
    return promise;
}

export function fetchTodos(grpId) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((txn) => {
            txn.executeSql(`SELECT * FROM todos WHERE grpId= ?`,
                [grpId],
                (_, result) => {
                    const todos = []
                    for (const dp of result.rows._array) {
                        todos.push(new Todo(
                            dp.id,
                            dp.grpId,
                            dp.title,
                            dp.desc,
                            dp.date,
                            dp.isComplete,
                            dp.isFavorite
                        ))
                    }
                    resolve(todos);
                },
                (_, error) => {
                    reject(error)
                    console.log(error);
                },
            )
        });
    });
    return promise;
}
