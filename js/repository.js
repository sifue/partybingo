const key = 'party-bingo';

class Repository {
  save(data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  load() {
    return JSON.parse(localStorage.getItem(key));
  }
}

export const repository = new Repository();
