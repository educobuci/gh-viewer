import { GitHubService } from "./packages/github/gitHubService";
import SearchPresenter from "./packages/search/searchPresenter";
import SearchUseCase from "./packages/search/searchUseCase";
import { SearchView } from "./packages/search/types";

export function createSearchUseCase(view: SearchView) {
  const service = new GitHubService()
  const presenter = new SearchPresenter(view)
  const useCase = new SearchUseCase(service, presenter)
  return useCase
}