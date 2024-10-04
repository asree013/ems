// import { useCallback } from 'react';
// import Talk from 'talkjs';
// import { Session, Chatbox } from '@talkjs/react';

// function Page() {
//   const syncUser = useCallback(
//     () =>
//       new Talk.User({
//         id: 'nina',
//         name: 'Nina',
//         email: 'nina@example.com',
//         photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
//         welcomeMessage: 'Hi!',
//       }),
//     []
//   );

//   const syncConversation = useCallback((session: any) => {
//     // JavaScript SDK code here
//     const conversation = session.getOrCreateConversation('new_conversation');

//     const other = new Talk.User({
//       id: 'frank',
//       name: 'Frank',
//       email: 'frank@example.com',
//       photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
//       welcomeMessage: 'Hey, how can I help?',
//     });
//     conversation.setParticipant(session.me);
//     conversation.setParticipant(other);

//     return conversation;
//   }, []);

//   return (
//     <Session appId="<MAGIC_APP_ID>" syncUser={syncUser}>
//       <Chatbox
//         syncConversation={syncConversation}
//         style={{ width: '100%', height: '500px' }}
//       ></Chatbox>
//     </Session>
//   );
// }

// export default Page;
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}

