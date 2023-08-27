package com.vekter.easygo.models;

import lombok.Data;


@Data
public class ChargeRequest
{
	public enum Currency {
		EUR, USD, RON;
	}
	private String description;
	private int amount;
	private Currency currency;
	private String stripeEmail;
	private String stripeToken;
}
