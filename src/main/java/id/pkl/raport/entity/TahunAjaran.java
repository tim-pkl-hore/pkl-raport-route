package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="tahun_ajaran")
public class TahunAjaran {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Integer id;
	
	@NotNull
	@Column(name="tahun_awal", unique = true)
	private String tahunAwal;
	
	@NotNull
	@Column(name="tahun_akhir", unique = true)
	private String tahunAkhir;
	
	@Column(name="current")
	private Boolean current;
	
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTahunAwal() {
		return tahunAwal;
	}

	public void setTahunAwal(String tahunAwal) {
		this.tahunAwal = tahunAwal;
	}

	public String getTahunAkhir() {
		return tahunAkhir;
	}

	public void setTahunAkhir(String tahunAkhir) {
		this.tahunAkhir = tahunAkhir;
	}

	public Boolean getCurrent() {
		return current;
	}

	public void setCurrent(Boolean current) {
		this.current = current;
	}
}
