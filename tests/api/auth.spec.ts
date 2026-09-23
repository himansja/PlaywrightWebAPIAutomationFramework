
import { test, expect } from '../../src/fixtures/apifixtures';


let accessToken : string

test.beforeEach("Create token", async({apiHelper})=>{
  
    let res = await apiHelper.get("url.com",);
    accessToken = await res.body.json().accessToken;
});
