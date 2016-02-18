package id.pkl.raport.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="hari_libur")
public class HariLibur {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="tanggal")
	private Date tanggal = new Date();
	
	@NotBlank
	@Column(name="deskripsi")
	private String deskripsi;
	
	@NotNull
	@Column(name="libur_nasional")
	private Boolean liburNasional;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getTanggal() {
		return tanggal;
	}

	public void setTanggal(Date tanggal) {
		this.tanggal = tanggal;
	}

	public String getDeskripsi() {
		return deskripsi;
	}

	public void setDeskripsi(String deskripsi) {
		this.deskripsi = deskripsi;
	}

	public Boolean getLiburNasional() {
		return liburNasional;
	}

	public void setLiburNasional(Boolean liburNasional) {
		this.liburNasional = liburNasional;
	}	
}
