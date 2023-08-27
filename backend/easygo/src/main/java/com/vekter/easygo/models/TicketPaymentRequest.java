package com.vekter.easygo.models;

import lombok.Data;


@Data
public class TicketPaymentRequest
{
	private ChargeRequest chargeRequest;
	private Ticket ticket;
	private String username;

}
