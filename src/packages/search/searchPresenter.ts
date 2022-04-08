import { User } from "../core/user";
import { SearchPresenterInterface, SearchView } from "./types";

export default class SearchPresenter implements SearchPresenterInterface {
  view: SearchView

  constructor(view: SearchView) {
    this.view = view
  }

  present(users: User[]): void {
    this.view.showResult({
      items: users.map(user => ({
        id: `@${user.login}`,
        image: user.avatarUrl,
        label: `${user.name}`,
        homePage: user.url })),
      total: 1
    })
  }
  
  presentError(message: string): void {
    this.view.showResult({
      total: 0,
      items: [],
      error: { title: 'Something went wrong :(', body: message }
    })
  }
}