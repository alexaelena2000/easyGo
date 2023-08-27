package com.vekter.easygo.controllers;

import com.stripe.exception.StripeException;
import com.vekter.easygo.models.ChargeRequest;
import com.vekter.easygo.models.Ticket;
import com.vekter.easygo.models.TicketPaymentRequest;
import com.vekter.easygo.services.StripeService;
import com.vekter.easygo.services.TicketService;
import com.vekter.easygo.services.TrainService;
import com.vekter.easygo.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class PaymentController
{

	@Autowired StripeService service;

	@Autowired TicketService ticketService;

	@Autowired UserService userService;

	@Autowired TrainService trainService;

	@PostMapping
	public ResponseEntity<String> completePayment(@RequestBody TicketPaymentRequest ticketPaymentRequest) throws StripeException {
		String chargeId = service.charge(ticketPaymentRequest.getChargeRequest()).getId();

		if(chargeId != null) {

			Ticket finalTicket = ticketService.buildTicket(ticketPaymentRequest.getTicket(), chargeId);
			String response = userService.addTicket(finalTicket, ticketPaymentRequest.getUsername());

			if(response.equals("failed")) {
				return new ResponseEntity<String>("Failed to add ticket to user.", HttpStatus.SERVICE_UNAVAILABLE);
			} else {
				trainService.updateAvailableSeats(finalTicket.getTripCodeReferences(), finalTicket.getClassCategory());
				return new ResponseEntity<String>(chargeId, HttpStatus.OK);
			}

		} else {
			return new ResponseEntity<String>("Please check the credit card details entered", HttpStatus.BAD_REQUEST);
		}

	}

	@ExceptionHandler
	public String handleError(StripeException ex) {
		return ex.getMessage();
	}
}
