import firebase, { db } from "./config";
export const addDocument = (collection, data) => {
  const query = db.collection(collection);
  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
export const updateDocument = async (id, collection, data) => {
  await db.collection(collection).doc(id).update(data);
  // await db.collection(collection).doc(id).set(data);
};
export const deleteDocument = async (id, collection) => {
  await db.collection(collection).doc(id).delete();
};
export const getAllDocument = async (collection) => {
  const query = await db.collection(collection).get();
  // const query = await db.collection(collection).doc("id or username gi do").get() -> Tìm xem user này hay gì đó có tồn tại không
  //  const query = await db.collection(collection).where("population", > , 100000).limit(10)
  // .orderBy("column name", "desc") or  // .orderBy("column name")
  // .startAfter(1000).get();
  const document = await query.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return document;
};
// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(" ").filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = "";
    name.split("").forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
