import { fetchAllInvites } from './actions'

export default async function AdminPanel() {
  const invites = await fetchAllInvites()

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Admin Panel - Invites</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {invites.map((invite) => {
          const borderColor =
            invite.status === 'pending'
              ? 'border-orange-500'
              : invite.status === 'rejected'
              ? 'border-red-500'
              : 'border-green-500'
          return (
            <div
              key={invite.id}
              className={`border-4 rounded-lg shadow-md p-4 bg-muted ${borderColor}`}
            >
              <h2 className='text-lg font-semibold'>{invite.email}</h2>
              <p className='text-sm text-muted-foreground'>
                Role: {invite.role}
              </p>
              <p className='text-sm text-muted-foreground'>
                Invited By: {invite.invitedBy}
              </p>
              <p className='text-sm text-muted-foreground'>
                Expires: {new Date(invite.expires).toLocaleDateString()}
              </p>
              <p className='text-sm text-muted-foreground'>
                Status: {invite.status}
              </p>
              <p className='text-sm text-muted-foreground'>
                Created At: {new Date(invite.createdAt).toLocaleDateString()}
              </p>
              {invite.updatedAt && (
                <p className='text-sm text-muted-foreground'>
                  Updated At: {new Date(invite.updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
