package com.vekter.easygo.repositories;

import com.vekter.easygo.models.ERole;
import com.vekter.easygo.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
