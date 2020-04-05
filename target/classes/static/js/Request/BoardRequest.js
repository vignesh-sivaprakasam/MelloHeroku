(function (ctx) {
        const App       = ctx.App || (ctx.App = {});
        const domain    = window.location.origin;
        const boardsUrl = "/boards";

        const boardUrl = domain + boardsUrl;
        const Board = {
                getAllBoards : () => {
                        return new Promise(function (resolve, reject) {
                                axios.get(boardUrl).then((response) => {
                                        console.log("Get All Boards response : ", response);
                                        resolve(response.data);
                                });
                        });
                },
                getBoard(id){
                        return new Promise((resolve, reject)=>{
                                axios.get(boardUrl+"/"+id).then(response => {
                                        console.log("Get Board response : ", response);
                                        resolve(response.data);
                                });
                        });
                },
                createBoard(board){
                        return new Promise((resolve, reject)=>{
                                axios.post(boardUrl, board).then((response)=>{
                                        console.log("Create Board response : ", response);
                                        resolve(response.data);
                                });
                        });
                },
                updateBoard(id, board){
                        return new Promise((resolve, reject)=>{
                                axios.put(boardUrl+"/"+id, board).then((response) => {
                                        console.log("Update Board response : ", response);
                                        resolve(response.data);
                                });
                        });
                },
                deleteBoard(id){
                        return new Promise((resolve, reject)=>{
                                axios.delete(boardUrl+"/"+id).then(response => {
                                        console.log("Delete Board response : ", response);
                                        resolve(response);
                                });
                        });
                }
        }
        App.Board = Board;
})(this);
// Board.