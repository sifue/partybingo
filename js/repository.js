const key = 'party-bingo';

class Repository {
  save({ numberListAll, selectableNumberIndices }) {
    localStorage.setItem(
      key,
      JSON.stringify({
        numberListAll,
        selectableNumberIndices,
      })
    );
  }
  load() {
    return JSON.parse(localStorage.getItem(key));
  }
}

export const repository = new Repository();
