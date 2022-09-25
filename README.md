# Full Schedule

Everything you need to run a private practice, powered by [`svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte), deployed to [Vercel](https://vercel.com).



## Enable Firebase Cloud Storage

Make sure to setup the proper <b>PERMISSIONS</b>

For more info on Cloud Storage permissions go <a href="https://firebase.google.com/docs/storage/security/rules-conditions#public" target="_blank">here</a>.

```bash
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Enable Firebase Firestore Database

Make sure to setup the proper <b>PERMISSIONS</b>

For more info on Firestore permissions go <a href="https://firebase.google.com/docs/firestore/security/get-started" target="_blank">here</a>.
```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

<b>Setup index</b>
```bash
CollectionID: appointments
Fields indexed: staff -> Ascending | cancelled -> Ascending
Query Scope: Collection
```

## Setup Environment Variables
```bash
GOOGLE_CLIENT_SECRET=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
GOOGLE_CLIENT_ID=766102917114-n2dnvdieq2c6alrrnasrhuidtufcqr64.apps.googleusercontent.com
GOOGLE_API_KEY=AIzaSyC89dBUy8LxrKmMINw-YLLl3FbWhL6dcfs
```
