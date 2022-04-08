import { User } from "../core/user";
import { SearchServiceInterface } from "../search/types";

const HOST = "https://api.github.com"

export class GitHubService implements SearchServiceInterface {
  async search(userName: string): Promise<User[]> {
    const result = await fetch(`${HOST}/users/${userName}`)
    if(result.status === 200) {
      const json = await result.json()
      return [{
        id: json.id,
        name: json.name,
        login: json.login,
        avatarUrl: json.avatar_url,
        url: json.html_url
      }]
    }
    return Promise.reject(`User "${userName}" not found`)
  }
}