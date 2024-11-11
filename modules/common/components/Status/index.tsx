'use client';

import React, { memo } from 'react';





export type StatusVariant =
  | 'success'
  | 'completed'
  | 'accepted'
  //
  | 'pending'
  | 'awaiting payment'
  | 'awaiting payment'
  | 'awaiting payout'
  //
  | 'partial payment'
  //
  | 'failed'
  | 'cancelled'

export type Status = {
  variant: StatusVariant
  className?: string
  hasBorder?: boolean
}

const Status = memo(function ({ variant, className, hasBorder }: Status) {
  // const bgColor =
  //   variant === 'success' ||
  //   variant === 'completed' ||
  //   variant === 'accepted' ||
  //   variant === TripStatus.Started ||
  //   variant === UserStatus.Active ||
  //   variant === AgentStatus.Enabled ||
  //   variant === TransactionStatus.Success
  //     ? 'bg-green-200/50'
  //     : variant === 'failed' ||
  //       variant === 'cancelled' ||
  //       variant === TripStatus.Cancelled ||
  //       variant === UserStatus.Deactivated ||
  //       variant === AgentStatus.Disabled ||
  //       variant === TransactionStatus.Failed
  //     ? 'bg-red-200/50'
  //     : variant === 'pending' ||
  //       variant === 'awaiting payment' ||
  //       variant === 'awaiting payout' ||
  //       variant === TripStatus.PendingPayment ||
  //       variant === TripStatus.Booked ||
  //       variant === TransactionStatus.AwaitingPayment ||
  //       variant === TransactionStatus.AwaitingPayout
  //     ? 'bg-orange-200/50'
  //     : variant === 'partial payment' ||
  //       variant === TripStatus.Ended ||
  //       variant === TripStatus.StartedDisputeResolved ||
  //       variant === TripStatus.EndedDisputeResolved ||
  //       variant === UserStatus.Locked ||
  //       variant === TransactionStatus.PartialPayment
  //     ? 'bg-blue-200/50'
  //     : 'bg-yellow-200/50'

  // const dotColor =
  //   variant === 'success' ||
  //   variant === 'completed' ||
  //   variant === 'accepted' ||
  //   variant === TripStatus.Started ||
  //   variant === UserStatus.Active ||
  //   variant === AgentStatus.Enabled ||
  //   variant === TransactionStatus.Success
  //     ? 'bg-green-500'
  //     : variant === 'failed' ||
  //       variant === 'cancelled' ||
  //       variant === TripStatus.Cancelled ||
  //       variant === UserStatus.Deactivated ||
  //       variant === AgentStatus.Disabled ||
  //       variant === TransactionStatus.Failed
  //     ? 'bg-red-500'
  //     : variant === 'pending' ||
  //       variant === 'awaiting payment' ||
  //       variant === 'awaiting payout' ||
  //       variant === TripStatus.PendingPayment ||
  //       variant === TripStatus.Booked ||
  //       variant === TransactionStatus.AwaitingPayment ||
  //       variant === TransactionStatus.AwaitingPayout
  //     ? 'bg-orange-500'
  //     : variant === 'partial payment' ||
  //       variant === TripStatus.Ended ||
  //       variant === TripStatus.StartedDisputeResolved ||
  //       variant === TripStatus.EndedDisputeResolved ||
  //       variant === UserStatus.Locked ||
  //       variant === TransactionStatus.PartialPayment
  //     ? 'bg-blue-500'
  //     : 'bg-yellow-500'

  // const borderColor =
  //   variant === 'success' ||
  //   variant === 'completed' ||
  //   variant === 'accepted' ||
  //   variant === TripStatus.Started ||
  //   variant === UserStatus.Active ||
  //   variant === AgentStatus.Enabled ||
  //   variant === TransactionStatus.Success
  //     ? 'border-green-300'
  //     : variant === 'failed' ||
  //       variant === 'cancelled' ||
  //       variant === TripStatus.Cancelled ||
  //       variant === UserStatus.Deactivated ||
  //       variant === AgentStatus.Disabled ||
  //       variant === TransactionStatus.Failed
  //     ? 'border-red-300'
  //     : variant === 'pending' ||
  //       variant === 'awaiting payment' ||
  //       variant === 'awaiting payout' ||
  //       variant === TripStatus.PendingPayment ||
  //       variant === TripStatus.Booked ||
  //       variant === TransactionStatus.AwaitingPayment ||
  //       variant === TransactionStatus.AwaitingPayout
  //     ? 'border-orange-300'
  //     : variant === 'partial payment' ||
  //       variant === TripStatus.Ended ||
  //       variant === TripStatus.StartedDisputeResolved ||
  //       variant === TripStatus.EndedDisputeResolved ||
  //       variant === UserStatus.Locked ||
  //       variant === TransactionStatus.PartialPayment
  //     ? 'border-blue-300'
  //     : 'border-yellow-300'

  return (
    <div
      // className={`flex items-center space-x-2 rounded-md text-xs md:text-sm ${bgColor} ${
      //   hasBorder && 'border'
      // } ${borderColor} w-fit px-3 py-1 ${className}`}
    >
      {/* <div className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span className="font-semibold lowercase">
        {variant.replace('_', ' ')}
      </span> */}
    </div>
  )
})

export default Status