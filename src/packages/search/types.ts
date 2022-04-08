import { User } from "../core/user"

export interface SearchServiceInterface {
  search(userName: string): Promise<User[]>
}

export interface SearchUseCaseInterface {
  search(userName: string): Promise<void>
}

export interface SearchPresenterInterface {
  present(users: User[]): void
  presentError(message: string): void
}

export interface SearchView {
  showResult(viewModel: SearchResultViewModel): void
}

export interface SearchResultViewModel {
  total: number
  items: Array<{ id: number, label: string, image: string, homePage: string }>
  error?: { title: string, body: string }
}