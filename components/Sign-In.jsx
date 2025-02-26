'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'

export default function SignInPage() {
  return (
    <div className="grid w-full flex-grow items-center bg-black px-4 sm:justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full flex-grow space-y-6 rounded-2xl bg-neutral-900 bg-[radial-gradient(circle_at_50%_0%,theme(colors.white/10%),transparent)] px-4 py-10 ring-1 ring-inset ring-white/5 sm:w-96 sm:px-8"
        >
          <header className="text-center">
            <h1 className="text-xl font-medium tracking-tight text-white">
              Sign in to Your Account
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-rose-400" />
          
          <SignIn.Strategy name="oauth_google">
            <SignIn.Action
              provider="oauth_google"
              className="w-full rounded-lg bg-white px-4 py-2 text-black text-sm font-medium shadow-md hover:bg-gray-200"
            >
              Sign in with Google
            </SignIn.Action>
          </SignIn.Strategy>
          
          <Clerk.Field name="identifier" className="group/field relative">
            <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-neutral-900 px-2 font-mono text-xs/4 text-white">
              Email address
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-white/20"
            />
            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
          </Clerk.Field>
          
          <Clerk.Field name="password" className="group/field relative">
            <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-neutral-900 px-2 font-mono text-xs/4 text-white">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-white/20"
            />
            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
          </Clerk.Field>
          
          <SignIn.Action
            submit
            className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-center text-sm font-medium text-white shadow-md hover:bg-emerald-600"
          >
            Sign In
          </SignIn.Action>
          
          <p className="text-center text-sm text-white/60">
            No account?{' '}
            <Clerk.Link
              navigate="sign-up"
              className="text-white underline"
            >
              Create an account
            </Clerk.Link>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}
