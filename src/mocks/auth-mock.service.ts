import {BehaviorSubject} from "rxjs";
import {User} from "../app/auth/models/user.model";

export class AuthMockService {
  user = new BehaviorSubject<User|null>(null)

  userData: {
    email: string,
    password: string,
    returnSecureToken: boolean,
  } = {
    email: '',
    password: '',
    returnSecureToken: true,
  }

  checkAuth() {
    const newUser = new User(
      "email@email.com",
      "123",
      "123",
      new Date()
    )
    if(newUser.token) {
      this.user.next(newUser)
    }
  }
}
