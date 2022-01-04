import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  databaseObj: SQLiteObject;
  readonly database_name: string = "gestionstock.db";
  readonly table_name: string = "stock";
  readonly historique_table_name: string = "historique";
  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.initializedatabase();
      });
  }
  initializedatabase(){
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    }).then((db: SQLiteObject) => { this.databaseObj = db; this.creationtable() }).catch(e => { console.log(JSON.stringify(e)) });
  }
  creationtable() {
      this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS ${this.table_name} (pid INTEGER PRIMARY KEY AUTOINCREMENT, Nom varchar(255), Qte INTEGER(15), Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, Prix INTEGER(50), Categorie varchar(50))`, []).then(() => { console.log(`table ${this.table_name} crée avec success`); })
      .catch(e => {
          console.log("error " + JSON.stringify(e))
      });
      this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS ${this.historique_table_name} (hid INTEGER PRIMARY KEY AUTOINCREMENT, prodid INTEGER(25), Qte INTEGER(15), Date_transaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP, Type varchar(255))`, []).then(() => { console.log(`table ${this.historique_table_name} crée avec success`); })
      .catch(e => {
          console.log("error " + JSON.stringify(e))
      });
  }
  enregistrenvstock(data): Promise<any> {
    var sql = `
        INSERT INTO ${this.table_name} (Nom, Qte, Prix, Categorie) VALUES ('${data.Nom}', '${data.Qte}', ${data.Prix}, '${data.Categorie}')
      `
      console.log(sql)
      return this.databaseObj.executeSql(sql, [])
        .then(() => {
          console.log('Row Inserted!');
          return true
        })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return false
        });
  }
  loaddataproduit(): Promise<any> {
    var sql = `SELECT * FROM ${this.table_name}`
      console.log(sql)

      return this.databaseObj.executeSql(sql, []).then((res) => {
        let items = [];
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
            items.push({
              pid: res.rows.item(i).pid,
              Nom: res.rows.item(i).Nom,
              Qte: res.rows.item(i).Qte,
              Date: res.rows.item(i).Date,
              Prix: res.rows.item(i).Prix,
              Categorie: res.rows.item(i).Categorie
            });
            }
        }
          return items
      })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return [];
        });
  }
  produitinfobyname(data):Promise<any> {
    var sql = `SELECT * FROM ${this.table_name} WHERE Nom = '${data}'`
      console.log(sql)

      return this.databaseObj.executeSql(sql, []).then((res) => {
        let items = [];
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
            items.push({
              pid: res.rows.item(i).pid,
              Nom: res.rows.item(i).Nom,
              Qte: res.rows.item(i).Qte,
              Date: res.rows.item(i).Date,
              Prix: res.rows.item(i).Prix,
              Categorie: res.rows.item(i).Categorie
            });
            }
        }
        return items
      })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return [];
        });
  }
  entrezhistorique(data): Promise<any> {
    var sql = `
        INSERT INTO ${this.historique_table_name} (prodid, Qte, Type) VALUES (${data.prodid}, ${data.Qte}, '${data.Type}')
      `
      console.log(sql)

      return this.databaseObj.executeSql(sql, [])
        .then(() => {
          console.log('Row Inserted!');
          return true
        })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return false
        });
  }
  updatestockdispo(qte, id): Promise<any> {
    var sql = `
        UPDATE ${this.table_name} SET Qte=${qte} WHERE pid = ${id}
      `
      console.log(sql)

      return this.databaseObj.executeSql(sql, [])
        .then(() => {
          console.log('Row Inserted!');
          return true
        })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return false
        });
  }
  updatestockprix(prix, id): Promise<any> {
    var sql = `
        UPDATE ${this.table_name} SET Qte=${prix} WHERE pid = ${id}
      `
      console.log(sql)

      return this.databaseObj.executeSql(sql, [])
        .then(() => {
          console.log('Row Inserted!');
          return true
        })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return false
        });
  }
  deleteproduit(id): Promise<any> {
    var sql = `
        DELETE ${this.table_name} WHERE pid = ${id}
      `
      console.log(sql)

      return this.databaseObj.executeSql(sql, [])
        .then(() => {
          console.log('Row Inserted!');
          return true
        })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return false
        });
  }
  loaddatahistorique(): Promise<any> {
    var sql = `SELECT ${this.historique_table_name}.Qte, ${this.historique_table_name}.Date_transaction, ${this.historique_table_name}.Type, ${this.table_name}.Nom,${this.table_name}.Categorie FROM ${this.historique_table_name} JOIN ${this.table_name} ON ${this.table_name}.pid = ${this.historique_table_name}.prodid`
      console.log(sql)
      return this.databaseObj.executeSql(sql, []).then((res) => {
        let items = [];
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
            items.push({
              Date_transaction: res.rows.item(i).Date_transaction,
              Nom: res.rows.item(i).Nom,
              Qte: res.rows.item(i).Qte,
              Type: res.rows.item(i).Type,
              Categorie: res.rows.item(i).Categorie
            });
            }
        }
          return items
      })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return [];
        });
  }
}
