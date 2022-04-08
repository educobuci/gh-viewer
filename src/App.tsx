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
    <div className="flex w-full h-screen flex-col justify-center items-center">
      <form className="flex w-full max-w-md gap-2" onSubmit={handleSubmit}>
        <input className="rounded w-full" type="text" placeholder="Search user name" value={term} onChange={handleTermChange} />
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>
      <div>
        { viewModel.error && 
          <div>
            <h3>{viewModel.error.title}</h3>
            <p>{viewModel.error.body}</p>
          </div>
        }
        { viewModel.total > 0 &&
          <div>
            <span>Total: {viewModel.total}</span>
            { viewModel.items.map(item =>
              <div key={item.id}>
                <img src={item.image} />
                <span>{item.label}</span>
                <a href={item.homePage}>Home Page</a>
              </div>
            ) }
          </div>
        }
      </div>
    </div>
  )
}

export default App
