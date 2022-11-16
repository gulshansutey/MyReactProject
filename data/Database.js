import * as SQLite from 'expo-sqlite'
import GroupModel from '../models/GroupModel';

const database = SQLite.openDatabase("mydatabase.db")

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(
            (txn) => {
                txn.executeSql(
                    `CREATE TABLE IF NOT EXISTS groups (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                icon TEXT NOT NULL,
                color TEXT NOT NULL
            )`,
                    [],
                    () => {
                        resolve();
                    },
                    (txn, error) => { reject(error); }
                )
                txn.executeSql(
                    `CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY NOT NULL,
                grpId TEXT NOT NULL,
                title TEXT NOT NULL,
                desc TEXT NOT NULL,
                isComplete INTEGER NOT NULL,
                isFavorite INTEGER NOT NULL,
                date INTEGER NOT NULL,
            )`,
                    [],
                    () => {
                        resolve();
                    },
                    (txn, error) => { reject(error); }
                )
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
                    reject(error)
                    console.log(error);
                },
            )
        });
    });
    return promise;
}
