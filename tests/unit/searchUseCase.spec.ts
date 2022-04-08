import SearchUseCase from '../../src/packages/search/searchUseCase'
import { arrayIncludes, mock } from 'jest-mock-extended'
import { SearchPresenterInterface, SearchServiceInterface } from '../../src/packages/search/types'
import { User } from '../../src/packages/core/user'

describe('SearchUseCase', () => {
  it('should search and present the results', async () => {
    const mockUser = mock<User>({ login: 'dhh' })
    const mockService = mock<SearchServiceInterface>()
    mockService.search.mockResolvedValueOnce([mockUser])
    const mockPresenter = mock<SearchPresenterInterface>()
    const useCase = new SearchUseCase(mockService, mockPresenter)
    await useCase.search('dhh')
    expect(mockService.search).toHaveBeenCalledWith('dhh')
    expect(mockPresenter.present).toHaveBeenCalledWith(arrayIncludes(mockUser))
  })
})