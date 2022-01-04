import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  databaseObj: SQLiteObject;
  readonly database_name: string = "gestionstock.db";
  readonly table_name: string = "utilisateur";
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
      this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS ${this.table_name} (pid INTEGER PRIMARY KEY AUTOINCREMENT, Prenom varchar(25), Password varchar(50), Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`, []).then(() => { console.log('table utilisateur crée avec success'); })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
      });
  }
  checkuser(data): Promise<any> {
    var sql = `SELECT * FROM ${this.table_name} WHERE Prenom = '${data.prenom}' AND Password = '${data.password}'`
      return this.databaseObj.executeSql(sql, []).then((res) => {
          if (res.rows.length > 0) {
            return true
          }
          else{
            return false
          }
      })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
          return false
        });
  }
  insertUser(data): Promise<any> {
    var sql = `
        INSERT INTO ${this.table_name} (Prenom, Password) VALUES ('${data.prenom}', '${data.password}')
      `
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
}
