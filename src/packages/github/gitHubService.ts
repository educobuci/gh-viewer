import { User } from "../core/user";
import { SearchServiceInterface } from "../search/types";

const HOST = "https://api.github.com"

export class GitHubService implements SearchServiceInterface {
  async search(userName: string): Promise<User[]> {
    const result = await fetch(`${HOST}/users/${userName}`)
    const json = await result.json()
    return [{
      id: json.id,
      login: json.login,
      avatarUrl: json.avatar_url,
      url: json.url
    }]
  }
}