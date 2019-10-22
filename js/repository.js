const key = 'party-bingo';

class Repository {
  save({ numberListAll, selectedCount }) {
    localStorage.setItem(
      key,
      JSON.stringify({
        numberListAll,
        selectedCount,
      })
    );
  }
  load() {
    return JSON.parse(localStorage.getItem(key));
  }
}

export const repository = new Repository();
