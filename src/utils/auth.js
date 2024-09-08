import moment from "moment";

export function setLocalStorage(responseObj) {

    const expiresIn = moment().add(responseObj.expiresIn.split(" ")[0], responseObj.expiresIn.split(" ")[1]);
   
    localStorage.setItem("token", responseObj.token.token);
    localStorage.setItem("expiresIn", JSON.stringify(expiresIn.valueOf()));
}

export function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
}

export function getExpirationTime(){

    const expiration = localStorage.getItem("expiresIn");
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt).fromNow();
}

export function isLoggedIn(){

    const expiration = localStorage.getItem("expiresIn");
    const expiresAt = JSON.parse(expiration);
    
    return moment().isBefore(moment(expiresAt));
}

export function isLoggedOut(){
    return !this.isLoggedIn();
}