import { db } from "../firebase";
import createMakeOrderMarkup from './createMarkupFunctions/createMakeOrderMarkup';


export async function handleOrder () {
    // await db.firestore().collection('cart').doc(item.id).delete();

const currentUser = db.auth().currentUser.uid;
    await db
  .firestore()
  .collection('cart')
  .where('userId', '==', currentUser)
  .get().then(
   async snapshot => {
      const sneakers = await snapshot.docs.map(doc => doc.data()) ;

      await db
      .firestore()
      .collection('orders')
      .add({ order: sneakers, userId: currentUser, createdAt: new Date() });

      const docId = await db.firestore().collection('cart').get();
      docId.forEach(async item => {
        const currentSneaker = item.data();
        if (currentSneaker.userId === currentUser) {
          await db.firestore().collection('cart').doc(item.id).delete();
        }
      });
    });
    createMakeOrderMarkup();
}

