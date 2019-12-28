import * as SQLite from 'expo-sqlite';

export const DB_NAME = 'places.db';

const db = SQLite.openDatabase(DB_NAME);

export const initDb = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        resolve,
        (_, err) => { reject(err) },
      );
    });
  });
};

export const insert = (table, fields, values) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${values.map(_ => '?').join(', ')});`,
        values,
        (_, result) => { resolve(result); },
        (_, err) => { reject(err); },
      );
    });
  });
};

export const get = (table, fields) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${table};`,
        [],
        (_, result) => { resolve(result); },
        (_, err) => { reject(err); },
      );
    });
  });
};

export const insertPlace = ({ title, image, address, lat, lng }) => {
  return insert(
    'places',
    ['title', 'image', 'address', 'lat', 'lng'],
    [title, image, address, lat, lng],
  )
};

export const getPlaces = () => {
  return get('places');
};
