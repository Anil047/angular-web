import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

/**
 * Created by anil on 3/19/17.
 */

@Injectable()
export class HttpService {
    public model: any;
    public otherSettings: any;
  public triggerDeleteBtn = false;

  constructor(private http: Http,) {
  }


  public clearFields() {
        this.model = {};
        this.otherSettings = {};
    }

}
