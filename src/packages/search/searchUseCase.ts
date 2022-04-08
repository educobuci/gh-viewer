import { SearchPresenterInterface, SearchServiceInterface, SearchUseCaseInterface } from "./types";

export default class SearchUseCase implements SearchUseCaseInterface {
  private service: SearchServiceInterface
  private presenter: SearchPresenterInterface

  constructor(service: SearchServiceInterface, presenter: SearchPresenterInterface) {
    this.service = service
    this.presenter = presenter
  }

  async search(userName: string) {
    try {
      if(userName.length > 0) {
        const users = await this.service.search(userName)
        this.presenter.present(users)
      } else {
        this.presenter.presentError('Please enter a user name.')
      }
    } catch (e: any) {
      this.presenter.presentError(e.message)
    }
  }
}