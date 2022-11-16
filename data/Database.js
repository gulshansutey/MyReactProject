import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase("mydatabase.db")

export function init() {
    database.transaction(
        (txn) => {
            txn.executeSql('create table if not exist groups ()')
        }
    );
}
