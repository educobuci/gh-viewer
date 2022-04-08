import { ChangeEvent, FormEvent, useState } from 'react'

import { GitHubService } from './packages/github/gitHubService'
import SearchUseCase from './packages/search/searchUseCase'
import { SearchResultViewModel } from './packages/search/types'
import SearchPresenter from './packages/search/searchPresenter'

const initialState: SearchResultViewModel = {
  items: [],
  total: 0,
}

function App() {
  const [term, setTerm] = useState('')
  const [viewModel, setViewModel] = useState(initialState)

  const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => { setTerm(e.target.value) }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const service = new GitHubService()
    const presenter = new SearchPresenter({
      showResult: (viewModel => setViewModel(viewModel)),
    })
    const useCase = new SearchUseCase(service, presenter)
    useCase.search(term)
  }

  return (
    <div className="flex w-full max-w-md h-screen flex-col justify-center m-auto gap-4">
      <form className="flex w-full gap-2" onSubmit={handleSubmit}>
        <input className="rounded w-full" type="text" placeholder="Search user name" value={term} onChange={handleTermChange} />
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>
      { viewModel.error && 
        <div className="bg-red-50 w-full p-4 rounded text-center">
          <h3 className="text-red-800 font-medium">{viewModel.error.title}</h3>
          <p className="text-red-700">{viewModel.error.body}</p>
        </div>
      }
      { viewModel.total > 0 &&
        <div className="flex flex-col">
          { viewModel.items.map(item =>
            <div className="grid grid-cols-[auto_1fr] rounded shadow p-4 border border-gray-100 items-center gap-x-4" key={item.id}>
              <img className="row-span-2 border border-gray-200 w-20 rounded-full" src={item.image} />
              <span className="text-2xl text-gray-700">{item.label}</span>
              <a className="text-gray-500 text-lg" href={item.homePage} target="_blank">{item.id}</a>
            </div>
          ) }
          <span className="text-sm mt-4 text-gray-500">Results: {viewModel.total}</span>
        </div>
      }
    </div>
  )
}

export default App
