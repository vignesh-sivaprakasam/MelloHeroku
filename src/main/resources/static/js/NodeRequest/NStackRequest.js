"use strict";
(function (ctx) {

        const domain    = "http://localhost:5000";
        const boardsUrl = "/api/boards";
        const stacksUrl = "/stacks";

        const boardUrl = domain + boardsUrl;
        const Stack = {
                getAllStacks : (boardID) => {
                        return new Promise((resolve, reject)=>{
                                axios.get(boardUrl+"/"+boardID+stacksUrl).then((response)=>{
                                        console.log("response : ",response);
                                });
                        });
                },
                getStack : (boardID, stackID)=>{
                        return new Promise((resolve, reject)=>{
                                axios.get(boardUrl+"/"+boardID+stacksUrl+"/"+stackID).then((response)=>{
                                        console.log("response :", response.data);
                                })
                        });
                },
                createStack(boardID, stack){
                        return new Promise((resolve, reject)=>{
                                axios.post(boardUrl+"/"+boardID+stacksUrl, stack).then((response)=>{
                                        console.log("Create Board response : ", response);
                                        resolve(response.data);
                                });
                        });
                },
                updateStack(boardID, stackID, stack){
                        return new Promise((resolve, reject)=>{
                                axios.put(boardUrl+"/"+boardID+stacksUrl+"/"+stackID, stack).then((response) => {
                                        console.log("Update Board response : ", response);
                                        resolve(response.data);
                                });
                        });
                },
                deleteStack(boardID, stackID){
                        return new Promise((resolve, reject)=>{
                                axios.delete(boardUrl+"/"+boardID+stacksUrl+"/"+stackID).then(response => {
                                        console.log("Delete Board response : ", response);
                                        resolve(response.data);
                                });
                        });
                }
        }

        App.Stack = Stack;
})(this);